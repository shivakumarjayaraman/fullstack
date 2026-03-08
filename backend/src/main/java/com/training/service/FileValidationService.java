package com.training.service;

import com.training.exception.InvalidInputException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

/**
 * Session 11: Validates uploaded files before storage.
 */
@Service
public class FileValidationService {

    private static final long MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            "jpg", "jpeg", "png", "gif", "pdf", "doc", "docx", "txt"
    );
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg", "image/png", "image/gif",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
    );

    public void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidInputException("File must not be empty");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new InvalidInputException("File size exceeds the 10 MB limit");
        }
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new InvalidInputException("File type not allowed: " + contentType);
        }
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            String ext = getExtension(originalFilename).toLowerCase();
            if (!ALLOWED_EXTENSIONS.contains(ext)) {
                throw new InvalidInputException("File extension not allowed: " + ext);
            }
        }
    }

    private String getExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
        return (lastDot >= 0) ? filename.substring(lastDot + 1) : "";
    }
}
