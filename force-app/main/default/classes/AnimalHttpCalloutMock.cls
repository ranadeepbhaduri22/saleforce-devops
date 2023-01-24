@isTest
    global with sharing class AnimalHttpCalloutMock implements HttpCalloutMock{
        // We have to implement the method 
        global HTTPResponse respond(HTTPRequest request){
            //create a fake response 
            HttpResponse response = new HttpResponse();
            response.setHeader('Content-Type', 'application/json');
            response.setBody('{"animals": ["majestic badger", "fluffy bunny", "scary bear", "chicken", "mighty moose"]}');
            response.setStatusCode(200);
            return response; 
        }
        @isTest 
        static void testPostCallout() {
            // Set mock callout class 
            Test.setMock(HttpCalloutMock.class, new AnimalHttpCalloutMock()); 
            // This causes a fake response to be sent
            // from the class that implements HttpCalloutMock. 
            HttpResponse response = TestAnimalCallout.postData('https://th-apex-http-callout.herokuapp.com/animals');
            // Verify that the response received contains fake values
            String contentType = response.getHeader('Content-Type');
            System.assert(contentType == 'application/json');
            String actualValue = response.getBody();
            System.debug(response.getBody());
            String expectedValue = '{"animals": ["majestic badger", "fluffy bunny", "scary bear", "chicken", "mighty moose"]}';
            System.assertEquals(actualValue, expectedValue);
            System.assertEquals(200, response.getStatusCode());
        }
    }