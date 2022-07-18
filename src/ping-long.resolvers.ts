import { Resolver, Mutation, Subscription, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

const PONG_EVENT_NAME = 'pong';

type PingPong = {
  color: String;
  click: Number;
};

@Resolver('Ping')
export class PingPongResolvers {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Mutation('ping')
  async ping(@Args() args: { pingPong: PingPong }) {
    const { pingPong } = args;
    this.pubSub.publish(PONG_EVENT_NAME, {
      [PONG_EVENT_NAME]: { ...pingPong },
    });
    return { ...pingPong };
  }

  @Subscription(PONG_EVENT_NAME)
  pong() {
    return this.pubSub.asyncIterator(PONG_EVENT_NAME);
  }
}
