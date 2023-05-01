/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        discord_blue: '#295DE7',
        discord_blurple: '#7289da',
        discord_purple: '#5865f2',
        discord_green: '#3ba55c',
        discord_serverBg: '#36393f',
        discord_chatHeaderInputBg: '#202225',
        discord_sidebar: '#202225',
        discord_channelsBg: '#2f3136',
        discord_serverNameHoverBg: '#34373c',
        discord_channel: '#8e9297',
        discord_channelHoverBg: '#3a3c43',
        discord_iconHoverBg: '#3a3c43',
        discord_userId: '#b9bbbe',
        discord_userSectionBg: '#292b2f',
        discord_iconHover: '#dcddde',
        discord_chatBg: '#36393f',
        discord_chatHeaderIcon: '#72767d',
        discord_chatInputBg: '#40444b',
        discord_messageBg: '#32353b',
        discord_messageTime: '#72767d',
        discord_message: '#dcddde',
      },
      height: {
        '83vh': '89.7vh'
      },
      borderRadius: ['hover', 'focus'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}