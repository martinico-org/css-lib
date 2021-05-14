export const master = [
  {
    animation_1: {
      folder: 'animation_1',
      name: 'NicoButton',
      category: 'button',
      html: `<div id='container'>
      <div id='animation' />
    </div>
    `,
      css: `#container { display: flex;
                       width: 100%;
        height: 100%;
               background-color: red;
        justify-content: center;
        align-items: center;
      }
            #animation {
            width: 150px;
            height: 150px;
            background-color: yellow;
            border-radius: 50%;
            animation: bounce 1s infinite ease-in-out;
        }
        
        #animation:hover {
            transform: scale(1.5) translateY(0);
        }
        
        @keyframes bounce {
            0% {
                transform: translateY(-50px)
            }
            50% {
                transform: translateY(10px)
            }
            100% {
                transform: translateY(-50px)
            }
        }
        `,
    },
  },
  { button_1: { folder: 'button_1', name: 'MartyButton', category: 'button' } },
  { button_2: { folder: 'button_2', name: 'NicoButton', category: 'button' } },
]

export default master
