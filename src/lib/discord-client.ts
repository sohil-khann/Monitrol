import { REST } from "@discordjs/rest"
import {
  RESTPostAPIChannelMessageResult,
  RESTPostAPICurrentUserCreateDMChannelResult,
  Routes,
  APIEmbed,
} from "discord-api-types/v10"

export class DiscordClient {
  private rest: REST

  constructor(token: string | undefined) {
    if (!token) {
      throw new Error("Discord bot token is required")
    }
    this.rest = new REST({ version: "10" }).setToken(token)
  }

  async createDM(
    userId: string
  ): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
    try {
      return await this.rest.post(Routes.userChannels(), {
        body: { recipient_id: userId },
      }) as RESTPostAPICurrentUserCreateDMChannelResult
    } catch (error: any) {
      if (error.code === 50007) {
        throw new Error("Cannot send message to this user. User may have DMs disabled or blocked the bot.")
      }
      throw new Error(`Discord API error: ${error.message}`)
    }
  }

  async sendEmbed(
    channelId: string,
    embed: APIEmbed
  ): Promise<RESTPostAPIChannelMessageResult> {
    try {
      return await this.rest.post(Routes.channelMessages(channelId), {
        body: { embeds: [embed] },
      }) as RESTPostAPIChannelMessageResult
    } catch (error: any) {
      throw new Error(`Failed to send Discord message: ${error.message}`)
    }
  }
}
