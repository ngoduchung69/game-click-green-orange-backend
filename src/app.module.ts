import { PingPongResolvers } from './ping-long.resolvers';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubSub } from 'graphql-subscriptions';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      driver: ApolloDriver
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PingPongResolvers,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
