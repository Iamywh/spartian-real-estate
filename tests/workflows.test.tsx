import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Store, useStore } from "../src/components/store";
import { InquiryForm } from "../src/components/inquiry";
import { Dashboard } from "../src/components/dashboard";
import { Configurator } from "../src/components/configurator";
import { seed } from "../src/lib/data";
function Probe() {
  const { data } = useStore();
  return <output data-testid="data">{JSON.stringify(data)}</output>;
}
function stored() {
  return JSON.parse(localStorage.getItem("spartian-demo-v1") || "null");
}
describe("Demo flows", () => {
  it("saves a fictitious inquiry and exposes it in the same-browser dashboard", async () => {
    const u = userEvent.setup();
    render(
      <Store>
        <InquiryForm kind="Inversor" />
        <Dashboard />
        <Probe />
      </Store>,
    );
    await u.type(screen.getByLabelText("Nombre de prueba"), "Prueba");
    await u.type(screen.getByLabelText("Email ficticio"), "prueba@example.com");
    await u.type(
      screen.getByLabelText("¿Qué te gustaría explorar?"),
      "Consulta ficticia",
    );
    await u.click(screen.getByRole("checkbox"));
    await u.click(
      screen.getByRole("button", { name: /Guardar solicitud demo/ }),
    );
    expect(await screen.findByText("Solicitud demo guardada")).toBeTruthy();
    await u.click(screen.getByRole("button", { name: /Inversores/ }));
    expect(screen.getByText("prueba@example.com")).toBeTruthy();
    expect(stored().inquiries[0].kind).toBe("Inversor");
    await u.selectOptions(screen.getByLabelText("Estado"), "Cerrada");
    expect(stored().inquiries[0].status).toBe("Cerrada");
  });
  it("creates, edits, persists and deletes a property without changing seed data", async () => {
    const u = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const view = render(
      <Store>
        <Dashboard />
      </Store>,
    );
    await u.click(screen.getByRole("button", { name: "Viviendas" }));
    await u.click(screen.getByRole("button", { name: /Crear vivienda/ }));
    await u.type(screen.getByLabelText("Nombre"), "Vivienda prueba");
    await u.type(
      screen.getByLabelText("Descripción"),
      "Concepto ficticio para comprobar la gestión",
    );
    await u.click(screen.getByRole("button", { name: "Guardar cambios" }));
    expect(stored().properties).toHaveLength(4);
    expect(seed.properties).toHaveLength(3);
    await u.click(
      screen.getByRole("button", { name: "Editar Vivienda prueba" }),
    );
    await u.clear(screen.getByLabelText("Precio ficticio (€)"));
    await u.type(screen.getByLabelText("Precio ficticio (€)"), "210000");
    await u.click(screen.getByRole("button", { name: "Guardar cambios" }));
    expect(stored().properties.at(-1).price).toBe(210000);
    view.unmount();
    render(
      <Store>
        <Dashboard />
      </Store>,
    );
    await u.click(screen.getByRole("button", { name: "Viviendas" }));
    expect(screen.getByText("Vivienda prueba")).toBeTruthy();
    await u.click(
      screen.getByRole("button", { name: "Eliminar Vivienda prueba" }),
    );
    expect(stored().properties).toHaveLength(3);
  });
  it("reflects configurator choices in the accessible 2D preview", async () => {
    const u = userEvent.setup();
    render(
      <Store>
        <Configurator />
      </Store>,
    );
    await u.click(screen.getByRole("radio", { name: "Con estudio" }));
    await u.click(screen.getByRole("radio", { name: "Salvia" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
      "Con estudio",
    );
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain(
      "Salvia",
    );
    await u.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(
      screen.getByRole("radio", { name: "Abierta" }).getAttribute("checked"),
    ).not.toBeNull();
  });
  it("prevents disabling the final option in a configurator category", async () => {
    const u = userEvent.setup();
    render(
      <Store>
        <Dashboard />
      </Store>,
    );
    await u.click(screen.getByRole("button", { name: "Configurador" }));
    await u.click(screen.getByRole("checkbox", { name: "Abierta" }));
    await u.click(screen.getByRole("checkbox", { name: "Con estudio" }));
    expect(
      screen.getByText("Mantén al menos una opción en cada categoría."),
    ).toBeTruthy();
    expect(stored().options.Distribución).toEqual(["Con estudio"]);
  });
  it("never reports success when browser persistence fails", async () => {
    const u = userEvent.setup();
    render(
      <Store>
        <InquiryForm />
      </Store>,
    );
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Quota exceeded", "QuotaExceededError");
    });
    await u.type(screen.getByLabelText("Nombre de prueba"), "Prueba");
    await u.type(screen.getByLabelText("Email ficticio"), "demo@example.com");
    await u.type(screen.getByLabelText("Cuéntanos tu idea"), "Demo");
    await u.click(screen.getByRole("checkbox"));
    await u.click(
      screen.getByRole("button", { name: /Guardar solicitud demo/ }),
    );
    expect(screen.queryByText("Solicitud demo guardada")).toBeNull();
    expect(
      screen.getByText(/No se ha podido guardar la solicitud/),
    ).toBeTruthy();
  });
});
