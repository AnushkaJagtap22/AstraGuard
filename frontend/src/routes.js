// Central AstraGuard Route Definitions

export const ROUTES = {
  dashboard: '/',
  investigate: '/investigate',
  investigationDetail: (id = ':investigationId') => `/investigate/${id}`,
  identity: '/identity',
  riskRadar: '/risk-radar',
  evidence: '/evidence',
  evidenceDetail: (id = ':evidenceId') => `/evidence/${id}`,
  history: '/history',
  assistant: '/assistant',
  police: '/police',
  incident: '/incident',
  incidentDetail: (id = ':incidentId') => `/incident/${id}`,
  demos: {
    scholarship: '/demo/scholarship',
    jobOffer: '/demo/job-offer',
    parcel: '/demo/parcel',
    bankAlert: '/demo/bank-alert',
    admission: '/demo/admission'
  }
};
