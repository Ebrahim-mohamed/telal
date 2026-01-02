import { type Entity, entity } from "./entity";
import type { Operators } from "./operator";

export function getSearchKey(
  filters: {
    key: string;
    value: string | number;
    operator: keyof typeof Operators;
  }[]
) {
  return filters.map((filter) => ({
    operator: filter.operator,
    key: filter.key,
    parameters: [
      filter.operator.startsWith("ENUM_") && {
        name: "enumType",
        value: filter.key,
      },
      {
        name: "value",
        value: filter.value,
      },
    ].filter(Boolean),
  }));
}

export function SearchOperatorkey(currentEntity: Entity, id: string) {
  const OperatorMapper = {
    [entity.SPECIALIZATION]: [
      { id: "englishName", key: "ENGLISH_NAME" },
      { id: "arabicName", key: "ARABIC_NAME" },
      { id: "createdAt", key: "CREATED_AT" },
    ],
    [entity.STAFF]: [
      { id: "firstName", key: "FIRST_NAME" },
      { id: "lastName", key: "LAST_NAME" },
      { id: "arabicName", key: "ARABIC_NAME" },
      { id: "email", key: "EMAIL" },
      { id: "phone", key: "PHONE" },
      { id: "gender", key: "GENDER" },
      { id: "dateOfBirth", key: "DATE_OF_BIRTH" },
      { id: "bloodGroup", key: "BLOOD_GROUP" },
      { id: "user.status", key: "STATUS" },
    ],
    [entity.UNITS]: [
      { id: "name", key: "NAME" },
      { id: "phone", key: "PHONE" },
      { id: "dateOfBirth", key: "DATE_OF_BIRTH" },
      { id: "bloodGroup", key: "BLOOD_GROUP" },
      { id: "user.status", key: "STATUS" },
    ],
    [entity.MEDICINE]: [
      { id: "name", key: "NAME" },
      { id: "createdAt", key: "CREATED_AT" },
    ],
    [entity.DOCTOR]: [
      { id: "firstName", key: "FIRST_NAME" },
      { id: "lastName", key: "LAST_NAME" },
      { id: "arabicName", key: "ARABIC_NAME" },
      { id: "email", key: "EMAIL" },
      { id: "phone", key: "PHONE" },
      { id: "dateOfBirth", key: "DATE_OF_BIRTH" },
      { id: "gender", key: "GENDER" },
      { id: "bloodGroup", key: "BLOOD_GROUP" },
      { id: "user.status", key: "STATUS" },
    ],
    [entity.SERVICE_TYPE]: [
      { id: "englishName", key: "ENGLISH_NAME" },
      { id: "arabicName", key: "ARABIC_NAME" },
      { id: "price", key: "PRICE" },
      { id: "doctorFirstname", key: "DOCTOR_FIRSTNAME" },
      { id: "doctorLastname", key: "DOCTOR_LASTNAME" },
      { id: "doctorArabicName", key: "DOCTOR_ARABIC_NAME" },
    ],
    [entity.APPOINTMENT]: [
      { id: "doctor.firstName", key: "DOCTOR_FIRSTNAME" },
      { id: "doctor.lastName", key: "DOCTOR_LASTNAME" },
      { id: "doctor.arabicName", key: "DOCTOR_ARABIC_NAME" },
      { id: "patient.name", key: "PATIENT_NAME" },
      { id: "serviceType.arabicName", key: "SERVICE_TYPE_ARABIC_NAME" },
      { id: "serviceType.englishName", key: "SERVICE_TYPE_ENGLISH_NAME" },
      { id: "extraFees", key: "EXTRA_FEES" },
      { id: "paymentMethod", key: "PAYMENT_METHOD" },
      { id: "date", key: "DATE" },
      { id: "status", key: "STATUS" },
      { id: "timeSlot", key: "TIME_SLOT" },
    ],
    [entity.COMPANY]: [
      { id: "name", key: "NAME" },
      { id: "contactPerson", key: "CONTACT_PERSON" },
      { id: "phone", key: "PHONE" },
      { id: "address", key: "ADDRESS" },
    ],
    [entity.INSURANCE_PLAN]: [
      { id: "name", key: "NAME" },
      { id: "coverageLimit", key: "COVERAGE_LIMIT" },
      { id: "discount", key: "DISCOUNT" },
      { id: "company.name", key: "COMPANY_NAME" },
    ],
    [entity.INSURANCE_CLAIM]: [
      { id: "patient.name", key: "PATIENT_NAME" },
      { id: "company.name", key: "COMPANY_NAME" },
      { id: "membershipId", key: "MEMBERSHIP_ID" },
      { id: "treatmentDate", key: "TREATMENT_DATE" },
      { id: "status", key: "STATUS" },
    ],
  };
  return (
    //@ts-ignore
    OperatorMapper?.[currentEntity]?.find(
      (op: { id: string; key: string }) => op.id === id
    )?.key || ""
  );
}
