package mwcd.lhm.backend.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;

@Entity
@SequenceGenerator(name = "CLIENT_SEQ", sequenceName = "client_sequence")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CLIENT_SEQ")
    private Integer id;

    private String name;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String record;

    // New Profile Fields
    private String phone;
    private Integer age;
    private String gender;
    private String bloodGroup;
    private String address;
    private String emergencyContact;

    // ================= Existing =================

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record;
    }

    // ================= New Profile Getters & Setters =================

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
}