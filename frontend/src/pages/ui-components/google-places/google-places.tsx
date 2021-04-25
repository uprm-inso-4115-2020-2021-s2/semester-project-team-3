import { Grid, TextField, createStyles, makeStyles, Theme, Box } from "@material-ui/core";
import React from "react"
import PlacesAutoComplete, {geocodeByAddress,getLatLng} from "react-places-autocomplete";

interface GooglePlacesProps{
    onAddressSelect: (lat : number,lng : number,address : string) => Promise<void>
}

export default function GooglePlacesAuto (props:GooglePlacesProps){
    const classes = useStyles();
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
                <TextField className={classes.submitTextField} variant="outlined"{...getInputProps({placeholder:"Car Location*"})}/>
                <Box className={classes.autocomplete}>
                    {loading ? <div>...loading</div> : null}

                    {suggestions.map((suggestion)=>{
                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                            borderStyle: "solid"
                            
                        };

                        return (
                            <div
                             {...getSuggestionItemProps(suggestion,{style})}>
                                {suggestion.description}
                            </div>
                        );

                    })}
                </Box>
            </>)}
        </PlacesAutoComplete>
    </>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        submitTextField: {
            paddingLeft: theme.spacing(0.5),
            paddingRight: theme.spacing(0.5),
            paddingBottom: theme.spacing(1.5),
            width: '50%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                paddingBottom: theme.spacing(1.5),
            },
        },
        autocomplete: {
            position:'absolute',
            zIndex:100,
            padding: theme.spacing(1),
            width: '28%',
        },
        
    }),
);