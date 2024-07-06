class ComplaintHandler {
    constructor(severity, handler) {
      this.severity = severity;
      this.handler = handler;
    }
  
    setNextHandler(handler) {
      this.handler = handler;
    }
  
    handleComplaint(complaint) {
      if (this.severity >= complaint.severity) {
        this.handle(complaint);
      } else if (this.handler) {
        this.handler.handleComplaint(complaint);
      } else {
        console.log('No handler available for this complaint.');
      }
    }
  
    handle(complaint) {
      console.log(`Handling complaint: ${complaint.description}`);
    }
  }
  
  class CustomerSupport extends ComplaintHandler {
    handle(complaint) {
      console.log(`Customer Support handling complaint: ${complaint.description}`);
    }
  }
  
  class TechnicalSupport extends ComplaintHandler {
    handle(complaint) {
      console.log(`Technical Support handling complaint: ${complaint.description}`);
    }
  }
  
  class Manager extends ComplaintHandler {
    handle(complaint) {
      console.log(`Manager handling complaint: ${complaint.description}`);
    }
  }
  
  // Test the Chain of Responsibility Pattern
  const customerSupport = new CustomerSupport(1);
  const technicalSupport = new TechnicalSupport(2);
  const manager = new Manager(3);
  
  customerSupport.setNextHandler(technicalSupport);
  technicalSupport.setNextHandler(manager);
  
  const complaint1 = { severity: 1, description: 'Internet connection issue' };
  const complaint2 = { severity: 2, description: 'Software crash' };
  const complaint3 = { severity: 3, description: 'Data breach' };
  
  customerSupport.handleComplaint(complaint1);
  customerSupport.handleComplaint(complaint2);
  customerSupport.handleComplaint(complaint3);
  