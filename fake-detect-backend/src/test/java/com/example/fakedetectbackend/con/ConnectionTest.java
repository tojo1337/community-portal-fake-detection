package com.example.fakedetectbackend.con;

import com.example.fakedetectbackend.model.threshold.ReqPayload;
import com.example.fakedetectbackend.model.threshold.ResPayload;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ConnectionTest {
    private String urlPath = "http://localhost:5000/api/v1/threshold";
    @Test
    @SneakyThrows
    public void connectionTest(){
        GsonBuilder gb = new GsonBuilder();
        gb.setPrettyPrinting();
        Gson json = gb.create();

        URL url = new URL(urlPath);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type","application/json");
        con.setDoOutput(true);
        con.connect();
        BufferedWriter out = new BufferedWriter(new OutputStreamWriter(con.getOutputStream()));
        out.write(json.toJson(new ReqPayload("Hello world here")));
        out.flush();
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String data = null;
        while((data=in.readLine())!=null){
            sb.append(data);
        }
        System.out.println(con.getResponseCode());
        ResPayload payload = json.fromJson(sb.toString(), ResPayload.class);
        out.close();
        in.close();

        assertEquals(16, payload.getThreshold());
    }
}
