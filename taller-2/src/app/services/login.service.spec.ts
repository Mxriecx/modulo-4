import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";


describe("pruebas del sevicio de login", () => {

    let httpMock: HttpTestingController;
    let service: LoginService;

    const credentialMock = {

        email: "pepita@gmail.com",
        password: "123"
    }

    const tokenMock = "djlkjndfndfjknfja"


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);
    });




    //caso 1 :

    it("caso 1 simular la peticion post", () => {

        const apiUrl = "http://localhost:9000/iniciarSesion";
        const responseMock = { "mensaje": "inicio de sesion exitoso" };

        service.login(credentialMock.email, credentialMock.password).subscribe(
            (res) => {
                expect(res).toEqual(responseMock);
            }
        )

        const req = httpMock.expectOne(apiUrl);
        expect(req.request.method).toBe("POST");

        req.flush(responseMock);

    });


    it("caso 2 obtener token", () => {
        localStorage.setItem("token", tokenMock);
        expect(service.getToken()).toBe(tokenMock);

    });



    it("caso 3 verificar si esta logueado", () => {
        localStorage.setItem("token", tokenMock);
        expect(service.isLoggedIn()).toBeTrue();
    });


    it("caso 4 cierre de sesion", () => {
        localStorage.setItem("token", tokenMock);
        service.logout();
        expect(localStorage.getItem("token")).toBeNull();
    });

});