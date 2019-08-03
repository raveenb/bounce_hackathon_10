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


def my_publish_callback(envelope, status):
    # Check whether request successfully completed or not
    if not status.is_error():
        pass  # Message successfully published to specified channel.
    else:
        pass  # Handle message publish error. Check 'category' property to find out possible issue
        # because of which request did fail.
        # Request can be resent using: [status retry];


from redis import Redis
from rq import Queue
from tasks import processCustomer, processTruck


def submitToRedisQueue(message):
    if message is None: return None
    source = message.get('source')
    if source is None: return

    q = Queue(connection=Redis())

    if source == 'customer': q.enqueue(processCustomer, message)
    if source == 'truck': q.enqueue(processTruck, message)


class MySubscribeCallback(SubscribeCallback):
    def presence(self, pubnub, presence):
        pass  # handle incoming presence data

    def status(self, pubnub, status):
        if status.category == PNStatusCategory.PNUnexpectedDisconnectCategory:
            pass  # This event happens when radio / connectivity is lost

        elif status.category == PNStatusCategory.PNConnectedCategory:
            # Connect event. You can do stuff like publish, and know you'll get it.
            # Or just use the connected event to confirm you are subscribed for
            # UI / internal notifications, etc
            #             pubnub.publish().channel(publishChannel).message("!!").pn_async(my_publish_callback)
            print('connection success')
        elif status.category == PNStatusCategory.PNReconnectedCategory:
            pass
            # Happens as part of our regular operation. This event happens when
            # radio / connectivity is lost, then regained.
        elif status.category == PNStatusCategory.PNDecryptionErrorCategory:
            pass
            # Handle message decryption error. Probably client configured to
            # encrypt messages and on live data feed it received plain text.

    def message(self, pubnub, message):
        print(message.message.get('customerId'))
        # compute distance between customer and truck
        # compute time to reach customer
        # sort by surge value, then wait time and then time to reach customer
        # select the highest value transaction with the shortest time to reach customer
        # farm out this into redis queue
        submitToRedisQueue(message.message)


listener = MySubscribeCallback()
pubnub.add_listener(listener)
pubnub.subscribe().channels(publishChannel).execute()

