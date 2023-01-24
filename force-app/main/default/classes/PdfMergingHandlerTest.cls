@isTest
private class PdfMergingHandlerTest {
    @testSetup
    private static void makeData(){

    }
    @istest
    private static void testSuccess(){
        Test.startTest();
            PdfMergingHandler.searchPdfFile('ckLogo');
            List<staticResource> resourceSS=new List<StaticResource>([SELECT Id FROM staticResource WHERE name='ckLogo']);
            PdfMergingHandler.getDocDetails(resourceSS.get(0).Id);
        Test.stopTest();
    }
}