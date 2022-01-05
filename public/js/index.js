import api from './services/api.js';
import Auth from './services/auth.js';


window.signout = Auth.signout;

async function loadHardware() {
  const hardware = await api.read('hardware')
  for (const {cpu, ram, disk, gpu} of hardware) {
    createHardware(cpu, ram, disk, gpu)
  }
}

function createHardware(cpu, ram, disk, gpu) {
  const cpuCont= document.getElementById('cpuoutput');
  const ramCont= document.getElementById('ramoutput');
  const hdCont= document.getElementById('hdoutput');
  const gpuCont= document.getElementById('gpuoutput');

  for (const {manufacturer, type, size} of ram) {
    let tamanho = size / 1024 / 1024 / 1024
    let rams = manufacturer + ' ' + type + ' ' + tamanho + 'GB' + '\n'
    ramCont.insertAdjacentHTML('beforeend', rams);
  }

  for (const {name, type, size} of disk) {
    let tamanho = size / 1024 / 1024 / 1024
    let disks = name + ' ' + type + ' ' + tamanho.toFixed(1) + 'GB' + '\n'
    hdCont.insertAdjacentHTML('beforeend', disks);
  }
  
  cpuCont.insertAdjacentHTML('beforeend', cpu);
  gpuCont.insertAdjacentHTML('beforeend', gpu);
}


loadHardware();