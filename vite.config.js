import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import pagesData from './src/utils/constants/pagesData.json';
import textBundle from './src/utils/constants/text.json';
import feedMessages from './src/utils/tests/feedMessages.json';
import messages from './src/utils/tests/messages.json';
import myData from './src/utils/tests/myData.json';

export default defineConfig({

  server: {
    port: 3000,
  },

  root: resolve(__dirname, 'src', 'pages'),

  build: {

    outDir: resolve(__dirname, 'dist'),    

    rollupOptions: {
      input: {
        index: 'src/pages/index.html',
        404: 'src/pages/404.html',
        500: 'src/pages/500.html',
        login: 'src/pages/login.html',
        signup: 'src/pages/signup.html',
        settings: 'src/pages/settings.html',
      },
    }

  },
  
  plugins: [

    handlebars({

      partialDirectory: [      
        resolve(__dirname, 'src', 'layouts'),
        resolve(__dirname, 'src', 'partials'),          
        resolve(__dirname, 'src', 'components'),
      ],

      context(pagePath) {
        
        // выберем данные текущей страницы, пока нет роутинга
        const findCurrentPage = Object.values(pagesData).filter(page => page.link === pagePath);
        const currentPageData = (findCurrentPage.length > 0) ? findCurrentPage[0] : pagesData.index;
        
        return {
          pageData: currentPageData,
          pagesData,
          myData,
          textVars: textBundle,
          messages,
          feedMessages,
          svgAttach: new URL('src/assets/svgs/attach.svg', import.meta.url).href
        };
      },
            
    }), 
    
  ],

}) 