const { app, BrowserWindow, Menu, shell } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 818,
    height: 710,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.maximize()
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  win.loadFile('./src/html/login.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


const template = [
  {label:'Arquivo',
      submenu:[
          {label: 'Sair', click: ()=> app.quit(), accelerator: 'Alt+f4'} //definindo um evento click para fechar o app, definindo alt+f4 como atalho
      ]
  },
  {label:'Exibir',
      submenu: [
          {label: 'Recarregar', role: 'reload'}, //função para recarregar a página
          {label: 'Ferramentas Do Desenvolvedor', role: 'toggleDevTools'}, //abre ferramentas avançadas
          {type: 'separator'}, //separa linhas
          {label: '+', role: 'zoomin'}, //aplicar zoom
          {label: '-', role: 'zoomout'}, //reduzir zoom
          {label: 'Zoom padrão', role: 'resetZoom'} //restaurar zoom ao inicial
      ]
  },
  {label: 'Ajuda', 
      submenu: [
          {label: 'Documentação', click: ()=> shell.openExternal('https://drive.google.com/file/d/1WhR0LBiJzDRBqt-PkYvId4ZL4yoZRLQL/view')}, //chama um evento para abrir um link externo
          {type: 'separator'},
          {label: 'Sobre', click: ()=> janelasobre()}
      ]      
  }
]

// const firebase = require('firebase/app');
// require('firebase/database');

// const firebaseConfig = {
//   apiKey: "SUA_CHAVE_API",
//   authDomain: "ID_DO_SEU_PROJETO.firebaseapp.com",
//   databaseURL: "https://ID_DO_SEU_PROJETO.firebaseio.com",
//   projectId: "ID_DO_SEU_PROJETO",
//   storageBucket: "ID_DO_SEU_PROJETO.appspot.com",
//   messagingSenderId: "SEU_ID_DO_REMETENTE",
//   appId: "SEU_ID_DO_APP"
// };

// firebase.initializeApp(firebaseConfig);
