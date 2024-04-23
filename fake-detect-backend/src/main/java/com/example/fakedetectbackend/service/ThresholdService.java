package com.example.fakedetectbackend.service;

import com.example.fakedetectbackend.model.threshold.ReqPayload;
import com.example.fakedetectbackend.model.threshold.ResPayload;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.SneakyThrows;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.http.HttpClient;

@Service
public class ThresholdService {
    @Value("${webhook}")
    private String urlPath;
    @SneakyThrows
    public double getThresholdValue(String message){
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
        if(con.getResponseCode()!=200){
            return 0;
        }else {
            ResPayload payload = json.fromJson(sb.toString(), ResPayload.class);
            out.close();
            in.close();
            con.disconnect();
            return payload.getThreshold();
        }
    }
}
