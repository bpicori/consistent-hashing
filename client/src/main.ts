import { create } from "domain";
import { ClusterStatus } from "../../src/core/Cluster";
import { ClusterClient } from "./client/cluster";
import "./style.css";
import { generateTable } from "./table";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <button id="insertServer">Insert Server</button>
    <input style="margin: 10px;" id="insertServerName" type="text" placeholder="Server Name" />
    <br />
    <button id="removeServer">Remove Server</button>
    <input style="margin: 10px;" id="removeServerName" type="text" placeholder="Server Name" />
    <br />
    <button id="insertKey">Insert Key</button>
    <input style="margin: 10px;" id="insertKeyValue" type="text" placeholder="Key Value" />
    <br />
    <button id="removeKey">Remove Key</button>
    <input style="margin: 10px;" id="removeKeyValue" type="text" placeholder="Key Value" />
    <br />
    <button id="reset">Reset</button>

    <div class="container">
    <div>
      <h3>Servers</h3>
      <div id="server-table"></div>
      <h3>Keys</h3>
      <div id="data-table"></div>
    </div>
    <canvas id="circle" width="400" height="400"></canvas>
    </div>




  </div>
`;

async function init() {
  const clusterClient = new ClusterClient("http://localhost:3000");
  const clusterStatus = await clusterClient.status();
  createUpdateTables(clusterStatus);
  drawCircle(clusterStatus);

  registerButtonEvent("insertServer", "insertServerName", async (value) => {
    const res = await clusterClient.registerServer(value);
    createUpdateTables(res);
    drawCircle(res);
  });

  registerButtonEvent("removeServer", "removeServerName", async (value) => {
    const res = await clusterClient.removeServer(value);
    createUpdateTables(res);
    drawCircle(res);
  });

  registerButtonEvent("insertKey", "insertKeyValue", async (value) => {
    const res = await clusterClient.insertKey(value);
    createUpdateTables(res);
    drawCircle(res);
  });

  registerButtonEvent("removeKey", "removeKeyValue", async (value) => {
    const res = await clusterClient.removeKey(value);
    createUpdateTables(res);
    drawCircle(res);
  });
}

function clusterStatusToTable(clusterStatus: ClusterStatus): {
  servers: Record<string, string | number>[];
  keys: Record<string, string | number>[];
} {
  const servers = clusterStatus.servers;
  const data = clusterStatus.data;

  return {
    servers: servers.map((server, index) => {
      return {
        ...server,
        index: index + 1,
      };
    }),
    keys: Object.keys(data).reduce<Record<string, string | number>[]>(
      (acc, serverName) => {
        const serverData = clusterStatus.data[serverName].map((d, index) => {
          return {
            ...d,
            server: serverName,
            index: index + 1,
          };
        });
        return [...acc, ...serverData];
      },
      []
    ),
  };
}

function drawCircle(clusterStatus: ClusterStatus) {
  const canvas = document.getElementById("circle") as HTMLCanvasElement;
  const context = canvas.getContext("2d")!;
  const { servers, keys } = clusterStatusToTable(clusterStatus);
  // Get the canvas element

  // Set the circle center coordinates and radius
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = 100;

  // Draw the circle
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.stroke();

  for (const server of servers) {
    // Set the angle at which you want to draw the point (in degrees)
    const angleInDegrees = server["modulo"] as number;

    // Convert the angle to radians
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    // Calculate the point's coordinates on the circle edge
    const pointX = centerX + radius * Math.cos(angleInRadians);
    const pointY = centerY + radius * Math.sin(angleInRadians);
    // Draw the point
    context.beginPath();
    context.arc(pointX, pointY, 7, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();

    // Draw the character inside the point
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(server["index"].toString(), pointX, pointY + 4);
  }

  for (const key of keys) {
    // Set the angle at which you want to draw the point (in degrees)
    const angleInDegrees = Number(key["modulo"]);

    // Convert the angle to radians
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    // Calculate the point's coordinates on the circle edge
    const pointX = centerX + radius * Math.cos(angleInRadians);
    const pointY = centerY + radius * Math.sin(angleInRadians);
    // Draw the point
    context.beginPath();
    context.arc(pointX, pointY, 7, 0, 2 * Math.PI);
    context.fillStyle = "blue";
    context.fill();

    // Draw the character inside the point
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(key["index"] as string, pointX, pointY + 4);
  }
}

function createUpdateTables(clusterStatus: ClusterStatus): void {
  // delete all tables
  const serverDataContainer = document.getElementById("server-table");
  serverDataContainer!.innerHTML = "";
  const dataContainer = document.getElementById("data-table");
  dataContainer!.innerHTML = "";

  const { servers, keys } = clusterStatusToTable(clusterStatus);
  const tableServer = generateTable(servers);
  const keysTable = generateTable(keys);

  serverDataContainer!.appendChild(tableServer);
  dataContainer!.appendChild(keysTable);
}

function registerButtonEvent(
  buttonId: string,
  inputId: string,
  callback: (value: string) => Promise<void> | void
): void {
  const button = document.querySelector<HTMLButtonElement>(`#${buttonId}`);
  button!.addEventListener("click", () => {
    const value = document.querySelector<HTMLInputElement>(
      `#${inputId}`
    )!.value;
    callback(value);
  });
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

init();
