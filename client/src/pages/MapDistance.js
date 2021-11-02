import React, {useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook"
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'

const MapDistance = ({google, locations = []}) => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        longitude_one: '', latitude_one: '', longitude_two: '', latitude_two: ''
    })

    const [distance_count, setDistanceCount] = useState(0)

    const onMapClicked = (mapProps, map, Event) => {
        if (distance_count === 0) {
            setForm({...form, longitude_one: Event.latLng.lng(), latitude_one: Event.latLng.lat()})
            // setDistanceList([...distance_list, {lat:Event.latLng.lat(), lng:Event.latLng.lng() }])
            setDistanceCount(distance_count + 1)
        }
        if (distance_count === 1) {
            setForm({...form, longitude_two: Event.latLng.lng(), latitude_two: Event.latLng.lat()})
            setDistanceCount(distance_count + 1)
        }

    }

    const [distance, setDistance] = useState(0)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleSubmitReset = () => {
        setForm({...form, longitude_one: '', longitude_two: '', latitude_one: '', latitude_two: ''})
        setDistanceCount(0)
    }


    const calculator = async () => {
        try {
            const data = await request('/api/coordinates_calculator/calculator', 'POST', {...form})
            console.log(data)
            setDistance(data.distance)
        } catch (e) {
        }
    }

    return (
        <div className="container top">
            <div className="row">
                <span className="card-title"><h5>You can calculate distance between two points</h5></span>
                <span><h5>Enter longitude and latitude of the points in form or choose points by click on the map below</h5></span>
                <div className="row">
                    <form className="col s10 z-depth-5 card-panel hoverable">
                        <div className="row">
                            <div className="col s6">
                                <label htmlFor="longitude_one">Input longitude for first point</label>
                                <input placeholder="0.0" id="longitude_one" name="longitude_one" type="text"
                                       onChange={changeHandler} value={form.longitude_one} className="validate"/>
                            </div>
                            <div className="col s6">
                                <label htmlFor="latitude_one">Input latitude for first point</label>
                                <input placeholder="0.0" id="latitude_one" name="latitude_one" type="text"
                                       onChange={changeHandler} value={form.latitude_one}/>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <label htmlFor="longitude_two">Input longitude for second point</label>
                                <input placeholder="0.0" id="longitude_two" name="longitude_two" type="text"
                                       onChange={changeHandler} value={form.longitude_two}/>

                            </div>
                            <div className="col s6">
                                <label htmlFor="latitude_two">Input latitude for second point</label>
                                <input placeholder="0.0" id="latitude_two" name="latitude_two" type="text"
                                       onChange={changeHandler} value={form.latitude_two}/>

                            </div>
                        </div>
                    </form>
                </div>
                <p>{distance} km</p>
                <div className="card-action">
                    <button className="btn yellow darken-4" onClick={calculator} disabled={loading}>Calculate</button>
                    <button className="btn yellow darken-4 btnn" onClick={handleSubmitReset}>Reset</button>
                </div>
            </div>
            <Map
                google={google}
                containerStyle={{

                    width: "90%",
                    height: "90%"
                }}
                style={{
                    width: "90%",
                    height: "90%"
                }}
                center={locations[0]}
                initialCenter={locations[0]}
                zoom={locations.length === 1 ? 18 : 13}
                disableDefaultUI={true}
                onClick={onMapClicked}
            >

                {locations.map(
                    coords => <Marker position={coords}/>
                )}

            </Map>
        </div>


    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDy8S4l-yXxQ4rN8H7QVojkPHXVkN5UoaI'
})(MapDistance)