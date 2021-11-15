
import { Card,Button } from "react-bootstrap";

export default function NotFound() {

    return (
        <>
            <Card style={{ width: 'auto' }}>
             <Card.Img style={{ width: '18rem' }} variant="top" src="https://www.smartclouds.co/Themes/SmartClouds/Content/images/404.png" />
                <Card.Body>
                    <Card.Title>Not Found
                    </Card.Title>
                    <Card.Text>
                        We can't find what you're looking for...
                    </Card.Text>
                    <Button variant="primary">back home</Button>
                </Card.Body>
            </Card>
            
           
        </>
    );
}