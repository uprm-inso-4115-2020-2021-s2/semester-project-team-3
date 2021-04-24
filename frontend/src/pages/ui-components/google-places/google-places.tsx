import { Grid, TextField } from "@material-ui/core";
import React from "react"
import PlacesAutoComplete, {geocodeByAddress,getLatLng} from "react-places-autocomplete";

interface GooglePlacesProps{
    onAddressSelect: (lat : number,lng : number,address : string) => Promise<void>
}

export default function GooglePlacesAuto (props:GooglePlacesProps){
    const [address,setAddress]= React.useState("");
    const [coordinates,setCoordinates] = React.useState({
        lat:null,
        lng:null
    });

    const handleselect = async (value:string) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        //console.log(latLng);
        setAddress(value);
        setCoordinates(latLng);
        props.onAddressSelect(latLng.lat,latLng.lng,value);

    };
    
    
    return <>
        
        <PlacesAutoComplete 
        value={address} 
        onChange={setAddress} 
        onSelect={handleselect}
        >
            {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
            <>
                <TextField variant="outlined"{...getInputProps({placeholder:"Type address"})}/>
                <div>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map((suggestion)=>{
                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        };

                        

                        return (
                            <div
                             style={{position:"absolute", zIndex:1000000}}
                             {...getSuggestionItemProps(suggestion,{style})}>
                                {suggestion.description}
                            </div>
                        );

                    })}
                </div>
            </>)}
        </PlacesAutoComplete>
    </>
}