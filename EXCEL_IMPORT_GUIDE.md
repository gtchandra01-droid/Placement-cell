# Excel Import Guide for Companies

## Overview
The admin panel now supports bulk import of companies from Excel files. This feature allows administrators to quickly add multiple companies to the system without manually entering each one.

## Excel File Format

### Required Columns
Your Excel file must contain the following columns (case-insensitive):

| Column Name | Type | Required | Description |
|------------|------|----------|-------------|
| Name | Text | Yes | Company name (must be unique) |
| Sector | Text | Yes | Industry sector (e.g., IT Services, Consulting) |
| Location | Text | Yes | Company location/headquarters |
| Logo URL | Text | No | URL to company logo image |
| Registration Link | Text | No | URL to company registration/careers page |

### Example Excel Structure

```
Name                | Sector           | Location    | Logo URL                              | Registration Link
Infosys             | IT Services      | Hyderabad   | https://example.com/infosys.png      | https://www.infosys.com/careers
TCS                 | IT Services      | Bangalore   | https://example.com/tcs.png          | https://www.tcs.com/careers
Wipro               | IT Services      | Hyderabad   | https://example.com/wipro.png        | https://www.wipro.com/careers
Accenture           | IT Consulting    | Mumbai      | https://example.com/accenture.png    | https://www.accenture.com/careers
```

## How to Use

### Step 1: Prepare Your Excel File
1. Create a new Excel file (.xlsx or .xls)
2. Add column headers in the first row
3. Enter company data starting from row 2
4. Ensure all required fields are filled
5. Save the file

### Step 2: Upload the File
1. Go to Admin Panel → Companies
2. Click the "Import Excel" button (green button with upload icon)
3. Select your Excel file
4. Click "Import"

### Step 3: Review Results
- The system will display the number of successfully imported companies
- Any errors or validation issues will be shown
- Duplicate companies (by name) will be updated with new information

## Supported File Formats
- `.xlsx` (Excel 2007 and later)
- `.xls` (Excel 97-2003)

## File Size Limit
Maximum file size: **5 MB**

## Validation Rules

1. **Name**: Must be unique. If a company with the same name exists, it will be updated.
2. **Sector**: Cannot be empty
3. **Location**: Cannot be empty
4. **Logo URL**: Optional - must be a valid URL if provided
5. **Registration Link**: Optional - must be a valid URL if provided

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "No file uploaded" | File selection was skipped | Select a file and try again |
| "Only Excel files are allowed" | Wrong file format | Use .xlsx or .xls format |
| "File size exceeds limit" | File is too large | Reduce file size to under 5 MB |
| "No valid companies found" | All rows have missing data | Check that Name, Sector, and Location are filled |
| "Failed to parse Excel file" | File is corrupted | Try saving the file again |

## Best Practices

1. **Validate Data Before Upload**
   - Check for duplicate company names
   - Ensure all required fields are filled
   - Verify URLs are correct

2. **Use Consistent Formatting**
   - Keep sector names consistent (e.g., "IT Services" not "IT service")
   - Use proper capitalization
   - Avoid extra spaces

3. **Backup Before Import**
   - Keep a backup of your Excel file
   - Note the number of companies before import

4. **Test with Small Batches**
   - Start with a small test file
   - Verify results before importing large batches

## Sample Excel File

A sample Excel file template is available for download from the admin panel. It contains:
- Proper column headers
- 5 example companies
- Correct formatting

## Troubleshooting

### Import Shows 0 Companies Imported
- Check that all required columns are present
- Verify that Name, Sector, and Location columns have data
- Ensure column headers match exactly (case-insensitive)

### Some Companies Not Imported
- Check the error message for specific rows
- Verify that company names are unique
- Check for special characters that might cause issues

### Duplicate Companies After Import
- This is expected behavior - companies with the same name are updated
- To avoid this, check for duplicates in your Excel file before importing

## API Details

### Endpoint
```
POST /api/admin/companies/import/excel
```

### Request
- Method: POST
- Authentication: Required (Bearer token)
- Content-Type: multipart/form-data
- File parameter: `file` (Excel file)

### Response
```json
{
  "success": true,
  "message": "Successfully imported 10 companies",
  "imported": 10,
  "failed": 0,
  "failedCompanies": [],
  "validationErrors": []
}
```

## Support

For issues or questions about the Excel import feature:
1. Check this guide
2. Review the error messages
3. Contact the admin support team

---

**Last Updated**: 2026
**Version**: 1.0
