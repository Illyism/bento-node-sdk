import type { BentoClient } from '../client';
import type { DataResponse } from '../client/types';
import type { CreateSubscriberParameters, GetSubscribersParameters, Subscriber } from './types';

export class BentoSubscribers<S> {
  private readonly _url = '/fetch/subscribers';

  constructor(private readonly _client: BentoClient) {}

  /**
   * Returns the subscriber with the specified email or UUID.
   *
   * @returns Promise\<Subscriber\<S\> | null\>
   */
  public async getSubscribers(
    parameters?: GetSubscribersParameters
  ): Promise<Subscriber<S> | null> {
    const result = await this._client.get<DataResponse<Subscriber<S>>>(this._url, parameters);

    if (Object.keys(result).length === 0 || !result.data) return null;
    return result.data;
  }

  /**
   * Creates a subscriber inside of Bento.
   *
   * @param parameters CreateSubscriberParameters
   * @returns Promise\<Subscriber\<S\> | null\>
   */
  public async createSubscriber(
    parameters: CreateSubscriberParameters
  ): Promise<Subscriber<S> | null> {
    const result = await this._client.post<DataResponse<Subscriber<S>>>(this._url, {
      subscriber: parameters,
    });

    if (Object.keys(result).length === 0 || !result.data) return null;
    return result.data;
  }
}
