import { importHeartRate } from "./imports";
import fs from "fs";

var hr = importHeartRate();

export const hrLogName = "hrLog.dat";
const cleanIntervalMS = 200000;
var lastWriteTime = Date.now();
const hrm = new hr.HeartRateSensor();    

export default function writeHeartData() {
  if (hr.HeartRateSensor) {
    console.log("app|","This device has a HeartRateSensor!");
    
    hrm.addEventListener("reading", () => {
      console.log("app|",`Current heart rate: ${hrm.heartRate}`);
            
      let buf = new Uint16Array(1);
      buf[0] = hrm.heartRate
      let fd = fs.openSync(hrLogName, "a");
      fs.writeSync(fd, buf);
      fs.closeSync(fd);
      lastWriteTime = Date.now();
      
    });
    hrm.start();
  } else {
    console.log("app|","This device does NOT have a HeartRateSensor!");
  }
}

function cleanLogFile() {
  console.log("app|","Cleaning Data Log")
  let stats = fs.statSync(hrLogName);
  if (stats) {
    console.log("app|","File size: " + stats.size + " bytes");
    console.log("app|","Last modified: " + stats.mtime);
  }
  
  let buf = new Uint16Array(1);
  buf[0] = getLastDataPoint();
  fs.writeFileSync(hrLogName, buf);
  
}

export function getLastDataPoint() {
  var last;

  try {
    let stats = fs.statSync(hrLogName);
    let fd = fs.openSync(hrLogName, "r");
    var buf = new ArrayBuffer(stats.size);
    fs.readSync(fd, buf);
    var uint16Arr = new Uint16Array(buf);  
    last = uint16Arr[uint16Arr.length - 1];
    fs.closeSync(fd);
  } catch (err) {

    if (err.code === 'ENOENT') {
      console.log("app|",'hrLogName not found!');
      last = -1;
    } else {
      throw err;
    }

  }
  
  return last;
}

export function timeSinceWrite() {
  var milis = Date.now() - lastWriteTime;
  if (milis < 1000 * 60) {
    return `${Math.round(milis / 1000)} s ago`
  } else {
    return `${Math.round(milis / 1000 / 60)} m ago`
  }
}

setInterval(cleanLogFile, cleanIntervalMS);

