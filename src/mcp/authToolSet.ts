import { ToolSet } from "./toolSet.js";

export const toolSet: ToolSet = {
  capabilities: {
    tools: {},
    logging: {}
  },
  tools: [
    {
      name: "Validate Business",
      description: "Validates a business",
      inputSchema: {
        type: "object",
        properties: {
          businessName: {
            type: "string",
            description: "The name of the business to validate"
          },
          address: {
            type: "string",
            description: "The address of the business"
          },
          taxId: {
            type: "string",
            description: "The tax ID of the business"
          }
        },
        required: ["businessName", "address", "taxId"]
      },
      callback: async (mcpServer, args) => {
        const result = {
          "status": "success",
          "data": {
            "shop_id": "RS-2025-001234",
            "shop_name": "Precision Auto Repair",
            "registration_number": "WA-MECH-456789",
            "license_status": "Valid",
            "license_expiry_date": "2026-03-31",
            "certifications": [
              "ASE Certified",
              "EPA Compliant",
              "State Safety Inspection Approved"
            ],
            "contact_info": {
              "address": "789 Industrial Blvd, Redmond, WA 98052",
              "phone": "+1-425-555-0199",
              "email": "contact@precisionautorepair.com",
              "website": "https://www.precisionautorepair.com"
            },
            "owner": {
              "full_name": "Carlos Martinez",
              "business_license_number": "WA-BIZ-998877"
            },
            "validation_checks": {
              "registration_check": true,
              "license_validity_check": true,
              "certification_check": true,
              "complaint_watchlist_check": false
            }
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result)
            }
          ]
        }
      }
    },
    {
      name: "Government ID Validation",
      description: "Validates the government ID of the insured party",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the insured party"
          },
          idNumber: {
            type: "string",
            description: "The government ID number to validate"
          }
        },
        required: ["idNumber"]
      },
      callback: async (mcpServer, args) => {
        await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
        
        const result =
          {
            "status": "success",
            "timestamp": "2025-05-14T09:32:21Z",
            "request_id": "a7f3c2d1-9b4e-4f3a-8c2e-123456789abc",
            "data": {
              "valid": true,
              "nationality": "United States",
              "issue_date": "2015-08-01",
              "expiry_date": "2025-08-01",
              "issuing_authority": "Department of Homeland Security",
            },
            "validation_checks": {
              "format_check": true,
              "checksum_valid": true,
              "expiry_check": true,
              "blacklist_check": false
            }
          }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result)
            }
          ]
        }
      }
    },
    {
      name: "Validate vehicle registration authenticaticity",
      description: "Validates a vehicle registration document",
      inputSchema: {
        type: "object",
        properties: {
          carRegistrationInfo: {
            type: "string",
            description: "The car registration information to validate"
          }
        },
        required: ["carRegistrationInfo"]
      },
      callback: async (mcpServer, args) => {
        
        const result = {
          "status": "success",
          "data": {
            "license_plate": "ABC1234",
            "state": "WA",
            "registration_valid": true,
            "vehicle": {
              "vin": "1HGCM82633A004352",
              "make": "Honda",
              "model": "Accord",
              "year": 2020,
              "color": "Silver",
              "body_type": "Sedan",
              "fuel_type": "Gasoline"
            },
            "registration_details": {
              "registration_number": "REG2025123456",
              "issue_date": "2024-06-01",
              "expiry_date": "2025-06-01",
              "registration_status": "Active"
            },
            "owner": {
              "license_number": "D1234567890"
            }
          },
          "validation_checks": {
            "plate_format_check": true,
            "vin_check": true,
            "registration_expiry_check": true,
            "stolen_vehicle_check": false
          }
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result)
            }
          ]
        }
      }
    }
  ]
}