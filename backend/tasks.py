import requests
from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub

pnconfig = PNConfiguration()

pnconfig.subscribe_key = 'sub-c-7618369a-b5e1-11e9-b6f7-eea0353b68c5'
pnconfig.publish_key = 'pub-c-245d8fa3-4f76-492c-95ec-70a44eddf994'

publishChannel = 'customerpublish'
subscribeChannel = 'customersubscribe'

pubnub = PubNub(pnconfig)


def publish_callback(result, status): print(result)


redisUrl = 'localhost'
redisTruckKey = 'trucks'
graphhopperApiKey = 'b32d62d0-a1c6-4786-a7aa-a648306f1e9e'


def getDistance(customerPosition, truckPosition, truckId):
    url = f'https://graphhopper.com/api/1/route?point={truckPosition[0]},{truckPosition[1]}&point={customerPosition[0]},{customerPosition[1]}&vehicle=truck&calc_points=false&key={graphhopperApiKey}'

    print(url)

    response = requests.get(url)
    if response.ok is not True:
        print(f'Response Not OK: {response.text}')
        return None, truckId

    paths = response.json().get('paths')
    if paths is None or len(paths) == 0:
        print('No Paths')
        return None, truckId

    timeInMins = round(paths[0].get('time') / 60_000),

    return timeInMins, truckId


import redis
import json


def processTruck(message):
    print(message.get('customerId'))
    print(message.get('position'))

    if message.get('source') == 'truck' and message.get('customerId') is not None:
        conn = redis.Redis(redisUrl)
        trucks = conn.hgetall(redisTruckKey)
        trucks[message.get('customerId')] = json.dumps(message.get('position'))
        conn.hmset(redisTruckKey, trucks)
    else:
        print('Warning: Invalid Truck Data')


def processCustomer(message):
    customerPosition = message.get('position')
    if customerPosition is None: return

    conn = redis.Redis(redisUrl)
    trucks = conn.hgetall(redisTruckKey)
    print(customerPosition)

    def convertToJson(data):
        return json.loads(data.decode('utf8').replace("'", '"'))

    distances = [getDistance(customerPosition, convertToJson(v), k) for k, v in trucks.items()]

    print(distances)

    distances = [x for x in distances if x[0] is not None]

    if len(distances) == 0:
        print('No Valid Distances')
        return

    distances = sorted(distances, key=lambda x: x[0], reverse=True)

    selection = distances[0]

    customerPayload = {
        'customerId': message.get('customerId'),
        'acceptance': True,
        'eta'       : selection[0]
    }

    truckPayload = {
        'customerId' : selection[1],
        'instruction': message.get('customerId')
    }

    print(truckPayload)
    print(customerPayload)

    if message['waitTime'] <= selection[0]:
        print('match found')
        pubnub.publish().channel(subscribeChannel).message(customerPayload).pn_async(publish_callback)
        pubnub.publish().channel(subscribeChannel).message(truckPayload).pn_async(publish_callback)
    else:
        print('No match found')
        customerPayload['acceptance'] = False
        customerPayload['eta'] = 'NA'
        pubnub.publish().channel(subscribeChannel).message(customerPayload).pn_async(publish_callback)


