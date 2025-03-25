/**
 * @fileoverview Live2D setup for the chatbot
 */

/**
 * Sets up the Live2D model using some form of black magic :D
 * @returns {Promise<void>}
 */
export function setupLive2D() {
    const loadLive2DScript = () => {
      return new Promise((resolve, reject) => {
        if (window.OML2D) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/oh-my-live2d@latest';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Live2D failed to load.'));
          document.body.appendChild(script);
        }
      });
    };
  
    return loadLive2DScript()
      .then(() => {
        window.OML2D.loadOml2d({
          primaryColor: '#4589FFFF',
          mobileDisplay: true,
          models: [
            {
              stageStyle:{
                marginBottom: '10px',
                marginLeft: '10px',
                border: '1px solid #E0E0E0FF',
                shadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
              },
              path: '/duck_model/duck.model3.json',
              position: [0,0],
              scale:0.15,
              mobileScale:0.15,
              mobilePosition: [0,0],
              mobileStageStyle:{
                marginBottom: '10px',
                marginLeft: '10px',
                border: '1px solid #E0E0E0FF',
                shadow: '0 0 10px rgba(0, 0, 0, 0.05)',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
              }
            }
          ],
          statusBar: {
            mobileStyle: {
              marginBottom: '100px',
            },
            style: {
              marginBottom: '80px',
            },
            restMessage: 'Resting',
            loadSuccessMessage: 'Ready'
          },
          tips: {
            mobileStyle:{
              display: 'none',
            },
            style: {
              position: 'fixed',
              bottom: '300px',
              display: 'none',
            }
          },
          menus: {
            mobileStyle: {
              marginRight: '20px',
            },
            style: {
              marginRight: '20px',
            },
            items: [
              {
                id: 'Rest',
                icon: 'icon-rest',
                title: 'rest',
                onClick: (oml2d) => {
                  oml2d.stageSlideOut();
                  oml2d.setStatusBarClickEvent(
                    () => {
                      oml2d.stageSlideIn();
                      oml2d.statusBarClose('Success');
                    }
                  );
                  oml2d.statusBarOpen('Resting');
                }
              }
            ]
          },
          container: '.live2d_container'
        });
      })
      .catch(error => console.error(error));
  }