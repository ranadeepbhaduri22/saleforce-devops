@isTest
public with sharing class TaskUtilTest {
    @isTest static void Test1(){
        String taskPriority = TaskUtil.getTaskPriority('CA');
        System.assertEquals('High', taskPriority);
    }
    @isTest static void Test2(){
        String taskPriority = TaskUtil.getTaskPriority('NAA');
        System.assertEquals(null, taskPriority);
    }
    @isTest static void Test3(){
        String taskPriority = TaskUtil.getTaskPriority('NY');
        System.assertEquals('Normal', taskPriority);
    }
}