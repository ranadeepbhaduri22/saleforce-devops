@isTest
public with sharing class TestVerifyDate {
    @isTest static void Test1(){
        Date checkDate = VerifyDate.CheckDates(Date.newInstance(2012,05,01),Date.newInstance(2012,05,10));
        System.assertEquals(Date.newInstance(2012,05,10), checkDate);
    }
    @isTest static void Test2(){
        Date checkDate = VerifyDate.CheckDates(Date.newInstance(2012,05,01),Date.newInstance(2012,06,10));
        System.assertEquals(Date.newInstance(2012,05,31), checkDate);
    }
}