public with sharing class TestAnimalCallout {
    public static HttpResponse getData(String API_ENDPOINT){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(API_ENDPOINT);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // Checking if the returned response status from the server is good
        if(response.getStatusCode() == 200){
            // Deseriazlizing the json and storing it into a map
            Map<String, Object> newMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> animalList = (List<Object>) (newMap.get('animals'));
            System.debug('Following animals - ');
    
            for(Object animal : animalList){
                System.debug(animal);
            }
        }
        return response;
    
    }
        public static HttpResponse postData(String API_ENDPOINT){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(API_ENDPOINT);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        //The data that we want to post
        request.setBody('{"name":"NewAnimalUsingPost"}');
        HttpResponse response = http.send(request);
        // Checking if the returned response status from the server is good
        if(response.getStatusCode() != 201){
            // Deseriazlizing the json and storing it into a map
            System.debug('The status code returned was not expected: ' +
            response.getStatusCode() + ' ' + response.getStatus());
    
        }else {
            System.debug(response.getBody());
        }
        return response;
        }
}