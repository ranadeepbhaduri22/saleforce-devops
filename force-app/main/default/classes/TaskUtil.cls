public with sharing class TaskUtil {
    public static string getTaskPriority(String state) {
        if(String.isBlank(state) || state.length() > 2){
            return null;
        }

        String taskPriority = '';

        if(state.equals('CA')){
            taskPriority = 'High';
        }
        else{
            taskPriority = 'Normal';
        }
        return taskPriority;
    }
}