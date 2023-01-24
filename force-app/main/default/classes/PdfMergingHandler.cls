global with sharing class PdfMergingHandler{
    public PdfMergingHandler(){}
    
    public class DocDetails{
        String id;
        String body;
        String name;
    }
    
    @RemoteAction
    public static List<StaticResource> searchPdfFile(String searchInput){
        List<StaticResource> searchedResult = new List<StaticResource>();
        try{
            String docToSearch = '%' + searchInput + '%';
            searchedResult = [SELECT Id, Name, ContentType 
                                                            FROM StaticResource
                                                            WHERE ContentType = 'application/pdf' 
                                                            AND Name LIKE :docToSearch];
        }catch(Exception exp){
            System.debug(exp.getMessage());
        }
        return searchedResult;                        
    }
    
    @RemoteAction
    public static DocDetails getDocDetails(String resourceId){
        DocDetails docDet = new DocDetails();
        try{
            StaticResource resoureDoc = [SELECT Id, Body, Name 
                                                FROM StaticResource
                                                WHERE Id =:resourceId];
            if(resoureDoc != null){
                docDet.id = resoureDoc.Id;
                docDet.name = resoureDoc.Name;
                docDet.body = EncodingUtil.base64Encode(resoureDoc.Body);
            }
        }catch(Exception exp){
            System.debug(exp.getMessage());
        }
        return docDet;
    }
}