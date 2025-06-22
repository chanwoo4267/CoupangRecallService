package dev.chanwoo4267.coupangrecallservicebackend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CsvUploadResponseDto {
    private boolean success;
    private String message;
    private int processedCount;
    private int errorCount;

    public CsvUploadResponseDto(boolean success, String message, int processedCount, int errorCount) {
        this.success = success;
        this.message = message;
        this.processedCount = processedCount;
        this.errorCount = errorCount;
    }
} 