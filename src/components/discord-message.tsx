import Image from "next/image"
interface DiscordMessageProps {
  avatarSrc: string
  avatarAlt: string
  username: string
  timestamp: string
  badgeText?: string
  badgeColor?: string
  title: string
  content: {
    [key: string]: string
  }
}

export const DiscordMessage=({avatarSrc,avatarAlt,username,timestamp,badgeText,badgeColor = "#43b581",title,content}:DiscordMessageProps)=>{
    return <div className="w-full flex items-start justify-start">
              <div className="flex items-center mb-2">
        <Image
          src={avatarSrc}
          alt={avatarAlt}
          width={40}
          height={40}
          className="object-cover rounded-full mr-3"
        />
      </div>

    </div>

}