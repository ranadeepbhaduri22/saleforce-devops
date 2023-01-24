public without sharing class QueryAllAccounts {
    public static List<Account> QueryAllAccounts() {
        return [SELECT id,name FROM Account];
    }
}
