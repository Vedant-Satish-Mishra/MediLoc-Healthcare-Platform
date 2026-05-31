```yaml
# MEDILOC Agents Configuration

agents:
    - name: Patient
        description: Represents the end-user seeking medical services or information.
        role:
            - To search for healthcare providers and services.
            - To book, manage, and cancel appointments.
            - To view their medical history and records within the system.
            - To manage their personal profile and insurance information.
        permissions:
            read:
                - provider_profiles
                - appointment_availability
                - personal_medical_records
            write:
                - personal_profile
                - appointments
                - provider_reviews
            delete:
                - appointments
        interactions:
            - target: Provider
                action: Book appointments
            - target: System
                action: Manage profile and view records

    - name: Provider
        description: Represents a healthcare professional, clinic, or hospital offering medical services.
        role:
            - To manage their professional profile and service offerings.
            - To manage their appointment schedule and availability.
            - To view and manage patient appointments.
            - To update patient records after a consultation.
        permissions:
            read:
                - own_schedule
                - patient_information_for_booked_appointments
            write:
                - own_profile
                - availability
                - appointments_confirmation
                - patient_record_notes
            delete:
                - appointment_requests
        interactions:
            - target: Patient
                action: Accept/decline appointment requests
            - target: System
                action: Manage platform presence

    - name: Admin
        description: A superuser with oversight and control over the entire MEDILOC system.
        role:
            - To manage user accounts (Patients and Providers).
            - To monitor system activity and ensure smooth operation.
            - To resolve disputes and handle support requests.
            - To manage system-wide settings and content.
        permissions:
            - full_crud_access_on_all_data
            - impersonate_users
            - access_system_logs
            - access_analytics_dashboards
        interactions:
            - target: All
                action: Provide support and perform administrative tasks
            - target: System
                action: Manage platform health and integrity
```