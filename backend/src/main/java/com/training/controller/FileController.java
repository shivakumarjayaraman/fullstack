package com.training.controller;

import com.training.dto.FileResponse;
import com.training.service.FileStorageService;
import com.training.service.FileValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private FileValidationService fileValidationService;
    
    @PostMapping("/upload")
    public ResponseEntity<FileResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        fileValidationService.validate(file);
        String fileName = fileStorageService.storeFile(file);
        
        String fileDownloadUri = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/api/files/download/")
                .path(fileName)
                .toUriString();
        
        FileResponse response = new FileResponse(
                fileName, fileDownloadUri, file.getContentType(), file.getSize()
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageService.loadFileAsResource(fileName);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, 
                                "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Session 11: multi-file upload — POST /files/upload-multiple
    @PostMapping("/upload-multiple")
    public ResponseEntity<List<FileResponse>> uploadMultipleFiles(
            @RequestParam("files") MultipartFile[] files) {
        List<FileResponse> responses = Arrays.stream(files)
                .map(file -> {
                    fileValidationService.validate(file);
                    String fileName = fileStorageService.storeFile(file);
                    String downloadUri = ServletUriComponentsBuilder
                            .fromCurrentContextPath()
                            .path("/api/files/download/")
                            .path(fileName)
                            .toUriString();
                    return new FileResponse(fileName, downloadUri, file.getContentType(), file.getSize());
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{fileName:.+}")
    public ResponseEntity<Void> deleteFile(@PathVariable String fileName) {
        try {
            fileStorageService.deleteFile(fileName);
            return ResponseEntity.noContent().build();
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
