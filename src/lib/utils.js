import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// meroctl --node-name node1 context create --watch https://blobby-public.euw3.prod.gcp.calimero.network/bafybeiamaqdxmbzrg4fj4ytwspqm63xubgpkml3f2c2hm6qlm6tytvorye --protocol near

// context create {applicationId} --protocol near
// context create kepJwAPmVmeFEZYfqLne3npzZu5hCGMLGPMntGce5Co --protocol near

// >> Created context Cqn66RcLXCwsAg7P95FDrCdvPR3WfipmCDqXDFaT8XJe with identity 8k4Qyt8wYTDpdVtUyCbyPFaB4n2NygWXeu1sh9hpmnoh

// start node 2

// identity new
// >> Private Key: 9w9rB1GNXU96F8xtN46onKXZY3EfaPCU4G6fgT5pJmyZ
// >> Public Key: EFCTtHuvgiyZz6BGo4EMAWHywdRMTKJxwmMajguuFahd

// in 1
// context invite {contextId} {invitorContextIdentity} {inviteeContextIdentity}
// context invite Cqn66RcLXCwsAg7P95FDrCdvPR3WfipmCDqXDFaT8XJe 8k4Qyt8wYTDpdVtUyCbyPFaB4n2NygWXeu1sh9hpmnoh EFCTtHuvgiyZz6BGo4EMAWHywdRMTKJxwmMajguuFahd

// >> Invited EFCTtHuvgiyZz6BGo4EMAWHywdRMTKJxwmMajguuFahd to context Cqn66RcLXCwsAg7P95FDrCdvPR3WfipmCDqXDFaT8XJe
// >> Invitation Payload: 2Fbvneqr9whPWV9SYGX8Q3mM9gwFsG3XnbA7xHg6opYLLcVWz4n748TqMjn2UqGoC8bQDiDD1Bz62bGMv9tqnJi24U7BJPt5GK5yaCUwpWFMfetHzvXTfu8zJsGQYxWTyUY3bmeCdY1uqMnByTf357zJzwX7Vzbsej

// in 2
// context join {inviteePrivateKey} {invitationPayload}
// context join 9w9rB1GNXU96F8xtN46onKXZY3EfaPCU4G6fgT5pJmyZ 2Fbvneqr9whPWV9SYGX8Q3mM9gwFsG3XnbA7xHg6opYLLcVWz4n748TqMjn2UqGoC8bQDiDD1Bz62bGMv9tqnJi24U7BJPt5GK5yaCUwpWFMfetHzvXTfu8zJsGQYxWTyUY3bmeCdY1uqMnByTf357zJzwX7Vzbsej