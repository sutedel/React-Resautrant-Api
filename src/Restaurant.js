import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { Card, CardGroup } from 'react-bootstrap';

export default function Restaurant() {
    let { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://young-journey-13407.herokuapp.com/api/restaurants/${id}`).then(res => res.json()).then(data => {
            setLoading(false);
            if (data.hasOwnProperty("_id")) {
                setRestaurant(data);
            } else {
                setRestaurant(null);
            }
        });
    }, [id]);

    if (loading) {
        return (
            <>
                <Card style={{ width: 'auto' }}>
                    <Card.Img variant="top" />
                    <Card.Body>
                        <Card.Text>
                            Loading Restaurant Data...
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
    else if (!loading && restaurant == null) {
        return (
            <>
                <Card style={{ width: 'auto' }}>
                    <Card.Img variant="top" />
                    <Card.Body>
                        <Card.Text>
                            Unable to find Restaurant with id: {id}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
    else if (restaurant) {
        return (
            <>
                <Card style={{ width: 'auto' }} id ={restaurant._id}>
                    <Card.Img variant="top" />
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>{restaurant.address?.building} {restaurant.address?.street}</Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <MapContainer style={{ "height": "400px" }} center={[restaurant.address?.coord[1], restaurant.address?.coord[0]]} zoom={13}
                    scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[restaurant.address?.coord[1], restaurant.address?.coord[0]]}></Marker>
                </MapContainer>

                <br />

                <h4>Ratings</h4>
                <hr />
                <CardGroup>
                    {restaurant.grades.map(grade =>
                        <span style={{ margin: 'auto' }}>

                            <Card key={grade._id} >
                                <Card.Header>
                                    <Card.Title>Grade: {grade.grade}</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>Completed: {new Date(grade.date).toLocaleDateString()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </span>
                    )}
                </CardGroup>
                <br />
            </>
        );
    }
}