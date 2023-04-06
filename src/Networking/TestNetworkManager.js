import { NetworkManager } from "./NetworkManager";
import Peer from "peerjs";
import axios from "axios";
import { getRandomString } from "../Utility/utility";


class NetworkManagerState{
    constructor(manager){
        this.manager = manager;
    }


    connect(connection){
        //alert(connection);
    }

    disconnect(){

    }
}


class HostNMState extends NetworkManagerState{
    constructor(manager){
        super(manager);
    }

    connect(connection){
        console.log(connection);
        alert("Server!");
    }

    disconnect(){

    }
    

}

class ClientNMState extends NetworkManagerState{
    constructor(manager){
        super(manager);
    }

    connect(connection){
        console.log(connection);
        alert("Client!");
    }

    disconnect(){

    }
}



export class TestNetworkManager extends NetworkManager{
    constructor(){
        super();
        

        this.id = null;

        this.HostingName = getRandomString(10);

        this.States = [

            new HostNMState(this),
            new ClientNMState(this)
        ];

        this.ActiveState = this.States[1];

        this.currentHostList = null;

        this.hosting = false;

        this.ConnectedPeers = {};

        this.ActiveHost = null;

        this.PlayerCount = 0;
        this.PlayerLimit = 20;


        this.EJSHook = null;

        


        

    }

    Init(networksettings){
        this.BrokerServerAddr = "http://" + networksettings.broker + ":9000/broker";

        this.Peer = new Peer(null ,{
            debug: 3, 
            path : '/peerjs/myapp',
            host : networksettings.broker,
            port : 9000
            
        });

        this.Peer.on('open' ,(id) => {
            console.log(id)
            this.id = id;

            this.makeBrokerRequest(0,this.id, this.hosting, this.HostingName, this.PlayerCount, this.PlayerLimit);
        });


        this.Peer.on('connection', (conn) =>{

            this.ActiveState.connect(conn);
        });

        this.createEJSLayer();

        


    }

    createEJSLayer(){
        
    }

    applyChanges(){

    }


    sendChanges(){

    }

    makeBrokerRequest(reqType, id, hosting, name, playercount, playerlimit){

        let data = {
            
            
                    id : id,
                    host : hosting,
                    name : name,
                    playercount : playercount,
                    playerlimit : playerlimit
                

        };

        switch(reqType){
            case 0 : // get request
                axios.get(this.BrokerServerAddr, data).then( (res) => {
                        if (!hosting){
                            this.currentHostList = res.data;
                            console.log(res.data);
                        }
                });
                break;

            case 1 : // post request
               axios.post(this.BrokerServerAddr, data).then( (res) => {
                        if (!hosting){
                            this.currentHostList = res.data;
                            console.log(res.data);
                        }
                });
                break;

            case 2: // delete request
               axios.delete(this.BrokerServerAddr, data).then( (res) => {
                        if (!hosting){
                            this.currentHostList = res.data;
                            console.log(res.data);
                        }
                });
                break;
            
            case 3 : // put request
               axios.put(this.BrokerServerAddr, data).then( (res) => {
                        if (!hosting){
                            this.currentHostList = res.data;
                            console.log(res.data);
                        }
                });
        }
        
    }

    NotifyNetworkState(isHosting){

        let reqtype = 0;

        if (isHosting){
            this.ActiveState = this.States[0];
            reqtype = 1;
        }
        else{
            this.ActiveState = this.States[1];
        }

        this.makeBrokerRequest(reqtype, this.id, isHosting, this.HostingName, this.PlayerCount, this.PlayerLimit);
    }


    ToggleHosting(){
        this.hosting = !this.hosting;

        this.NotifyNetworkState(this.hosting);
    }

    ConnectToFirstHost(){
        if (this.currentHostList == null){
            return;
        }
        let first = Object.keys(this.currentHostList);
        first = first[0];
        this.ActiveHost = this.Peer.connect(this.currentHostList[first].id, {
         reliable: true   
        });
    }

    BroadcastToClients(message){

    }

    Show

}