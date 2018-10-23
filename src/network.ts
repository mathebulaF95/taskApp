import { Network } from '@ionic-native/network';


export class network{

    

    constructor(private network: Network) {
        
     }




    networkMethod(){

            // watch network for a disconnect
            let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            });
        
            // stop disconnect watch
            disconnectSubscription.unsubscribe();
        
        
            // watch network for a connection
            let connectSubscription = this.network.onConnect().subscribe(() => {
            console.log('network connected!');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type. Might need to wait.
            // prior to doing any api requests as well.
            setTimeout(() => {
                if (this.network.type === 'wifi') {
                console.log('we got a wifi connection, woohoo!');
                }
            }, 3000);
            });
        
            // stop connect watch
            connectSubscription.unsubscribe();
    }
    
}