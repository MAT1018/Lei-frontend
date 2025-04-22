export function parseQRCodeData(data) {
    try {
      const parsed = JSON.parse(data);
      if (parsed.lei && parsed.accountId) {
        return parsed;
      }
      throw new Error('Invalid QR code data format');
    } catch (e) {
      throw new Error('Failed to parse QR code data');
    }
  }