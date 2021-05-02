import GooglePlacesAuto from "../ui-components/google-places/google-places"
export default function Index(){
    async function onAddressSelect(lat:number,lng:number,address:string){
        console.log(lat,lng,address);
    }
    return(
        <div>
           <h1>This is Request Form</h1>
            <GooglePlacesAuto onAddressSelect={onAddressSelect}/> 
        </div>
        

    )
        
}
