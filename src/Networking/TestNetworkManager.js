import { NetworkManager } from "./NetworkManager";
import Peer from "peerjs";
import axios from "axios";
import { getRandomString } from "../Utility/utility";


export class TestNetworkManager extends NetworkManager{
    constructor(){
        super();
        this.Peer = new Peer();

        this.id = null;

        this.HostingName = getRandomString(10);

        this.currentHostList = null;

        this.hosting = false;


        this.Peer.on('open' ,(id) => {

            
            axios.get(this.BrokerServerAddr, {
            
                params : {
                    id : id,
                    host : false
                }
            }).then( (res) => {
                console.log("my id is " + id);
                console.log(res);
                this.id = id;
            });
        });


        

    }

    Init(networksettings){
        this.BrokerServerAddr = networksettings.broker;
    }

    applyChanges(){

    }


    sendChanges(){

    }

    sendBrokerRequest(id, hosting, name){
        axios.get(this.BrokerServerAddr, {
            
            params : {
                    id : id,
                    host : hosting,
                    name : name
                }

        }).then( (res) => {
            if (!hosting){
                console.log(res.data);
                this.currentHostList = JSON.parse(res.data);
            }
        });
    }

    NotifyNetworkState(isHosting){
        this.sendBrokerRequest(this.id, isHosting, this.HostingName);
    }


    ToggleHosting(){
        this.hosting = !this.hosting;

        this.NotifyNetworkState(this.hosting);
    }

}