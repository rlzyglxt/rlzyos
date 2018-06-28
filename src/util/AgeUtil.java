package util;

import java.util.ArrayList;
import java.util.Calendar;

public class AgeUtil {
		// TODO Auto-generated method stub
    public static String caluAge(String str){
        ArrayList<Integer> bir = new ArrayList<>();
        int i = 0;
        Calendar c = Calendar.getInstance();
        int year = c.get(Calendar.YEAR);
        int month = c.get(Calendar.MONTH)+1;
        int date = c.get(Calendar.DATE);
        int age = 0;
        System.out.println(year+" "+month+" "+date+"");
        try {
            str = str.trim();
            while(str.trim().charAt(0) == '-'){
                str = str.substring(1);
            }
            String temp[] = str.trim().split("-");
            if(temp.length == 3){
                for(;i < 3; i++){
                    bir.add(Integer.parseInt(temp[i]));
                }
            }
            if(year - bir.get(0) > 0){
            age = year - bir.get(0) - 1;
            if(month >= bir.get(1) ){
                if(date >= bir.get(2)){
                    age+=1;
                }
            }
        }
        }catch (Exception e){
            System.out.println("无法解析为年月日的结构");
            throw e;
        }
        return age+" ";
    }  
}
