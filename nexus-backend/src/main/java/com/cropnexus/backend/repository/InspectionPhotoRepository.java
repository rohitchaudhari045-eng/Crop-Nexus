package com.cropnexus.backend.repository;

import com.cropnexus.backend.entity.InspectionPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface InspectionPhotoRepository extends JpaRepository<InspectionPhoto, UUID> {

    List<InspectionPhoto> findByInspectionId(UUID inspectionId);

    void deleteByInspectionId(UUID inspectionId);
}

