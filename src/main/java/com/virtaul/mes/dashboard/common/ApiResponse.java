package com.virtaul.mes.dashboard.common;

import java.time.LocalDateTime;

public record ApiResponse<T>(
    String status,
    T data,
    String message,
    LocalDateTime timestamp
) {
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<T>("OK", data, null, LocalDateTime.now());
    }

     public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>("ERROR", null, message, LocalDateTime.now());
    }
}
