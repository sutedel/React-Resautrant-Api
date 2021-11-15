import { useLocation, useHistory,Route } from 'react-router-dom';
import queryString from 'query-string';
import { useState, useEffect } from 'react';
import { Pagination, Card, Table } from 'react-bootstrap';
import NotFound from './NotFound';

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    let [page, setPage] = useState(1);
    const history = useHistory();

    const location = useLocation();
    const query = queryString.parse(location.search);

    let url;
    if (query.borough == null || query.borough === "") {
        url = "https://young-journey-13407.herokuapp.com/api/restaurants?page=" + page + "&perPage=10";
    }
    else {
        url = "https://young-journey-13407.herokuapp.com/api/restaurants?page=" + page + "&perPage=10&borough=" + query.borough;
        console.log(query.borough);
    }

    useEffect(() => {
        fetch(url).then(res => res.json()).then(data => {
            if (data.length > 0) {
                setRestaurants(data);
            }
            else {
                setRestaurants([]);
            }
        });
    }, [location, page,url]);


    function previousPage() {
        if (page > 1) {
            setPage(page -= 1);
        }
    }

    function nextPage() {
        setPage(page += 1);
    }

    if (restaurants == null) {
        return (
            <>
                <Card style={{ width: 'auto' }}>
                    <Card.Img variant="top" />
                    <Card.Body>
                        <Card.Text>
                            Loading Restaurants...
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
    else if (restaurants != null && restaurants.length === 0) {
        return (
            <Route>
            <NotFound />
          </Route>
           
        );
    }
    else if (restaurants) {
        return (
            <>
                <Card style={{ width: 'auto' }}>
                    <Card.Img variant="top" />
                    <Card.Body>
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text>
                            Full list of restaurants. Optionally sorted by borough
                        </Card.Text>
                    </Card.Body>
                </Card>

                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Borough</th>
                            <th>Cuisine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map(restaurant =>
                            <tr key={restaurant._id} onClick={() => { history.push(`/restaurant/${restaurant._id}`) }}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address.building} {restaurant.address.street}</td>
                                <td>{restaurant.borough}</td>
                                <td>{restaurant.cuisine}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Pagination>
                    <Pagination.Prev onClick={previousPage} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                </Pagination>
            </>
        );
    }
}