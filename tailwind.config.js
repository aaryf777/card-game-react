/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const Myclass = plugin(function({addUtilities}){
  addUtilities({
    ".my-rotate-180" : {
      transform:"rotateY(180deg)"
    }
  })
})
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        basebg: '#131B2A',
        red: {
          DEFAULT: '#F1350C',
          2: '#433239',
          4:'#F1350B',
        },
        green: {
          DEFAULT: '#38d925',
          2: '#2E5A39',
          3:'#3BA63E',
          4: '#32B529',
          6: '#38D926'
        },
        blue: {
          DEFAULT: '#0000ff',
          2: '#007FFF',
          3: '#3457D5',
          4: '#2a52be'
        },
        gray: {
          DEFAULT: '#2B323F',
          1:'#2B323F',
          2: '#8C98B0',
          3:'#496780 ',
          4: '#1F2634',
          5:'#C9CED4',
          6: '#242B38',
          7:'#C9CED5',
          8:'#131B2B',
          9:'#3F4B62'
        },
        yellow: {
          DEFAULT: '#FDD031',
          2: '#534F34',
          3:'#FDD032'
        },
      }
    },
    fontFamily: {
      'surfer' : ['Original Surfer', 'cursive']
    }
  },
  plugins: [Myclass],
}
